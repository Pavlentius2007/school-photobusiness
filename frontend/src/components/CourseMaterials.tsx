import React from 'react';
import { useCourseAccess } from '../hooks/useCourseAccess';
import { CourseMaterial } from '../data/coursesData';

interface CourseMaterialsProps {
  courseId: number;
  materials: CourseMaterial[];
  courseTitle: string;
}

const CourseMaterials: React.FC<CourseMaterialsProps> = ({ courseId, materials, courseTitle }) => {
  const { hasAccessToCourseMaterials } = useCourseAccess();

  const hasAccess = hasAccessToCourseMaterials(courseId);

  if (!hasAccess) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '2px dashed #cbd5e1',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#475569',
          marginBottom: '8px'
        }}>
          Доступ к материалам закрыт
        </h3>
        <p style={{ 
          color: '#64748b', 
          fontSize: '14px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          Для доступа к материалам курса "{courseTitle}" обратитесь к администратору платформы.
        </p>
        <div style={{ 
          marginTop: '16px',
          padding: '12px 20px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <p style={{ 
            margin: '0', 
            fontSize: '12px', 
            color: '#64748b',
            fontWeight: '500'
          }}>
            📧 admin@sianoro.ru
          </p>
        </div>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '2px dashed #cbd5e1',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#475569',
          marginBottom: '8px'
        }}>
          Материалы курса
        </h3>
        <p style={{ 
          color: '#64748b', 
          fontSize: '14px'
        }}>
          Материалы для курса "{courseTitle}" пока не загружены.
        </p>
      </div>
    );
  }

  const getMaterialIcon = (type: string): string => {
    switch (type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'presentation': return '📊';
      case 'document': return '📝';
      default: return '📁';
    }
  };

  const getMaterialIconColor = (type: string): string => {
    switch (type) {
      case 'video': return '#ef4444';
      case 'pdf': return '#3b82f6';
      case 'image': return '#10b981';
      case 'presentation': return '#f59e0b';
      case 'document': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        color: '#1e293b',
        marginBottom: '20px'
      }}>
        📚 Материалы курса
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '16px' 
      }}>
        {materials.map((material) => (
          <div
            key={material.id}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
            onClick={() => window.open(material.url, '_blank')}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ 
                fontSize: '32px',
                color: getMaterialIconColor(material.type),
                flexShrink: 0
              }}>
                {getMaterialIcon(material.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4'
                }}>
                  {material.name}
                </h4>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    backgroundColor: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    {material.type.toUpperCase()}
                  </span>
                  {material.size && (
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#64748b'
                    }}>
                      {material.size}
                    </span>
                  )}
                </div>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#94a3b8',
                  marginBottom: '12px'
                }}>
                  Загружено: {new Date(material.uploadedAt).toLocaleDateString()}
                </div>
                
                <button
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }}
                >
                  📖 Открыть материал
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseMaterials; 