import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBaseCourses } from '../data/coursesData';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const courses = getBaseCourses();

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      lineHeight: 1.6,
      color: '#1a1a1a',
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Наши курсы
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Выберите курс, который подходит именно вам. От основ до продвинутых техник.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem' 
          }}>
            {courses.map((course) => (
              <div key={course.id} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              >
                {/* Course Image Section */}
                <div style={{
                  background: course.gradient,
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontSize: '4rem' }}>{course.image}</div>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    color: '#2d3748',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {course.badge}
                  </div>
                </div>

                {/* Course Content */}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#2d3748'
                  }}>
                    {course.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#4a5568',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {course.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <span style={{
                        background: '#f7fafc',
                        color: '#4a5568',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {course.duration}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2d3748'
                    }}>
                      {course.price.toLocaleString()} ₽
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    style={{
                      background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 4px 15px rgba(238, 90, 82, 0.4)',
                      transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 90, 82, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 90, 82, 0.4)';
                    }}
                  >
                    Посмотреть программу
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage; 