import React, { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  allowDownload?: boolean;
  autoPlay?: boolean;
  title?: string;
  description?: string;
}

interface VideoInfo {
  type: 'youtube' | 'vimeo' | 'local';
  videoId?: string;
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onProgress,
  onComplete,
  allowDownload = false,
  autoPlay = false,
  title,
  description
}) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Парсинг URL для определения типа видео
  useEffect(() => {
    const parseVideoUrl = (url: string): VideoInfo => {
      // YouTube
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const youtubeMatch = url.match(youtubeRegex);
      if (youtubeMatch) {
        return {
          type: 'youtube',
          videoId: youtubeMatch[1],
          url: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1&controls=1&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&origin=${window.location.origin}`
        };
      }

      // Vimeo
      const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
      const vimeoMatch = url.match(vimeoRegex);
      if (vimeoMatch) {
        return {
          type: 'vimeo',
          videoId: vimeoMatch[1],
          url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoPlay ? 1 : 0}&title=0&byline=0&portrait=0&controls=1&disablekb=1&dnt=1`
        };
      }

      // Локальный файл
      return {
        type: 'local',
        url: url
      };
    };

    try {
      const info = parseVideoUrl(videoUrl);
      setVideoInfo(info);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить видео');
      console.error('Ошибка парсинга URL видео:', err);
    }
  }, [videoUrl, autoPlay]);

  // Отслеживание прогресса для локальных видео
  useEffect(() => {
    if (videoInfo?.type === 'local' && videoRef.current) {
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        const total = video.duration;
        
        if (total > 0) {
          const progressPercent = (current / total) * 100;
          setCurrentTime(current);
          setDuration(total);
          setProgress(progressPercent);
          
          // Вызываем callback с прогрессом
          onProgress?.(progressPercent);
          
          // Проверяем завершение (90% просмотра считается завершением)
          if (progressPercent >= 90 && !isCompleted) {
            setIsCompleted(true);
            onComplete?.();
          }
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsCompleted(true);
        onComplete?.();
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoInfo, onProgress, onComplete, isCompleted]);

  // Обработка сообщений от iframe (YouTube/Vimeo)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      
      // YouTube API события
      if (data.event === 'onStateChange') {
        if (data.info === 1) { // Воспроизведение
          setIsPlaying(true);
        } else if (data.info === 2) { // Пауза
          setIsPlaying(false);
        } else if (data.info === 0) { // Завершено
          setIsCompleted(true);
          onComplete?.();
        }
      }
      
      // Vimeo API события
      if (data.event === 'finish') {
        setIsCompleted(true);
        onComplete?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onComplete]);

  // Форматирование времени
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Обработка ошибок
  if (error) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
        <h3 style={{ color: '#dc3545', marginBottom: '8px' }}>Ошибка загрузки видео</h3>
        <p style={{ color: '#6c757d' }}>{error}</p>
      </div>
    );
  }

  if (!videoInfo) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: '#6c757d' }}>Загрузка видео...</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '100%',
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    }}>
      {/* Заголовок видео */}
      {(title || description) && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          {title && (
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#212529'
            }}>
              {title}
            </h3>
          )}
          {description && (
            <p style={{
              margin: '0',
              fontSize: '14px',
              color: '#6c757d',
              lineHeight: '1.5'
            }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Видеоплеер */}
      <div style={{ position: 'relative' }}>
        {videoInfo.type === 'local' ? (
          <video
            ref={videoRef}
            controls
            controlsList={allowDownload ? undefined : 'nodownload'}
            onContextMenu={allowDownload ? undefined : (e) => e.preventDefault()}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '600px',
              display: 'block'
            }}
            preload="metadata"
          >
            <source src={videoInfo.url} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        ) : (
          <iframe
            src={videoInfo.url}
            style={{
              width: '100%',
              height: '400px',
              border: 'none',
              display: 'block'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Видео'}
          />
        )}

        {/* Прогресс-бар для локальных видео */}
        {videoInfo.type === 'local' && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#007bff',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        )}
      </div>

      {/* Информация о прогрессе для локальных видео */}
      {videoInfo.type === 'local' && (
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <div>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div>
            Прогресс: {Math.round(progress)}%
            {isCompleted && (
              <span style={{
                marginLeft: '8px',
                color: '#28a745',
                fontWeight: '600'
              }}>
                ✓ Завершено
              </span>
            )}
          </div>
        </div>
      )}

      {/* Предупреждение о защите от скачивания */}
      {!allowDownload && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#fff3cd',
          borderTop: '1px solid #ffeaa7',
          fontSize: '12px',
          color: '#856404',
          textAlign: 'center'
        }}>
          ⚠️ Скачивание видео запрещено. Видео предназначено только для просмотра.
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 