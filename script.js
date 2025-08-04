// Global variables
let selectedPlan = {
    name: 'Стандарт',
    price: '49,900'
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupNavigation();
    setupPaymentForm();
    setupFAQ();
    setupAnimations();
    setupScrollEffects();
}

// Navigation setup
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Payment form setup
function setupPaymentForm() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const installmentOptions = document.getElementById('installmentOptions');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'installment') {
                installmentOptions.style.display = 'block';
            } else {
                installmentOptions.style.display = 'none';
            }
        });
    });
    
    // Handle form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
}

// Handle payment form submission
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate form
    if (!validatePaymentForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        if (paymentMethod === 'card') {
            processCardPayment(formData);
        } else {
            processInstallmentPayment(formData);
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Validate payment form
function validatePaymentForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    if (!name || name.trim().length < 2) {
        showNotification('Пожалуйста, введите корректное имя', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return false;
    }
    
    if (!phone || phone.trim().length < 10) {
        showNotification('Пожалуйста, введите корректный телефон', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Process card payment
function processCardPayment(formData) {
    // Here you would integrate with YooKassa or other payment gateway
    console.log('Processing card payment:', {
        plan: selectedPlan,
        customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        }
    });
    
    // Simulate successful payment
    showNotification('Оплата прошла успешно! Проверьте email для доступа к курсу.', 'success');
    closeModal();
    
    // Send data to server (in real implementation)
    sendPaymentData('card', formData);
}

// Process installment payment
function processInstallmentPayment(formData) {
    const selectedBank = document.querySelector('input[name="bank"]:checked');
    
    if (!selectedBank) {
        showNotification('Пожалуйста, выберите банк для рассрочки', 'error');
        return;
    }
    
    console.log('Processing installment payment:', {
        plan: selectedPlan,
        bank: selectedBank.value,
        customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        }
    });
    
    // Simulate successful installment application
    showNotification('Заявка на рассрочку отправлена! Банк свяжется с вами в течение 24 часов.', 'success');
    closeModal();
    
    // Send data to server (in real implementation)
    sendPaymentData('installment', formData);
}

// Send payment data to server
function sendPaymentData(paymentType, formData) {
    const data = {
        paymentType: paymentType,
        plan: selectedPlan,
        customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        },
        timestamp: new Date().toISOString()
    };
    
    // In real implementation, send to your backend
    fetch('/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Payment data sent:', data);
    })
    .catch(error => {
        console.error('Error sending payment data:', error);
    });
}

// FAQ setup
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Animations setup
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .timeline-item, .pricing-card, .review-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects setup
function setupScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Plan selection
function selectPlan(planType) {
    const plans = {
        basic: {
            name: 'Базовый',
            price: '29,900'
        },
        standard: {
            name: 'Стандарт',
            price: '49,900'
        },
        premium: {
            name: 'Премиум',
            price: '89,900'
        }
    };
    
    selectedPlan = plans[planType];
    
    // Update modal content
    const planNameElement = document.getElementById('selectedPlanName');
    const planPriceElement = document.getElementById('selectedPlanPrice');
    
    if (planNameElement) planNameElement.textContent = selectedPlan.name;
    if (planPriceElement) planPriceElement.textContent = selectedPlan.price;
    
    // Open modal
    openModal();
}

// Modal functions
function openModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Open video modal (placeholder)
function openVideo() {
    // In real implementation, this would open a video modal
    alert('Видео презентация будет доступна в полной версии сайта');
}

// Toggle FAQ item
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Form validation helpers
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Export functions for global access
window.selectPlan = selectPlan;
window.openModal = openModal;
window.closeModal = closeModal;
window.scrollToSection = scrollToSection;
window.openVideo = openVideo;
window.toggleFaq = toggleFaq; 