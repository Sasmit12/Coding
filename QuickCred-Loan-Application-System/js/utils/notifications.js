/**
 * Enhanced Notification System with Accessibility
 * Provides toast notifications with multiple types, animations, and ARIA support
 */

class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = new Map();
        this.init();
    }

    init() {
        this.createContainer();
        this.injectStyles();
    }

    createContainer() {
        if (this.container) return;
        
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(this.container);
    }

    injectStyles() {
        if (document.getElementById('notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 400px;
                pointer-events: none;
            }

            .notification {
                background: white;
                border-radius: 12px;
                padding: 16px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                border-left: 4px solid;
                display: flex;
                align-items: flex-start;
                gap: 12px;
                pointer-events: auto;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .notification.hide {
                transform: translateX(100%);
                opacity: 0;
                height: 0;
                padding: 0;
                margin: 0;
                border: none;
            }

            .notification.success {
                border-left-color: #10B981;
                background: linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%);
            }

            .notification.error {
                border-left-color: #EF4444;
                background: linear-gradient(135deg, #FEF2F2 0%, #FEF2F2 100%);
            }

            .notification.warning {
                border-left-color: #F59E0B;
                background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
            }

            .notification.info {
                border-left-color: #3B82F6;
                background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
            }

            .notification-icon {
                font-size: 20px;
                margin-top: 2px;
                flex-shrink: 0;
            }

            .notification.success .notification-icon {
                color: #10B981;
            }

            .notification.error .notification-icon {
                color: #EF4444;
            }

            .notification.warning .notification-icon {
                color: #F59E0B;
            }

            .notification.info .notification-icon {
                color: #3B82F6;
            }

            .notification-content {
                flex: 1;
                min-width: 0;
            }

            .notification-title {
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 4px;
                color: #1F2937;
                line-height: 1.4;
            }

            .notification-message {
                font-size: 13px;
                color: #6B7280;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                color: #9CA3AF;
                cursor: pointer;
                padding: 2px;
                border-radius: 4px;
                transition: all 0.2s ease;
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .notification-close:hover {
                background: rgba(107, 114, 128, 0.1);
                color: #6B7280;
            }

            .notification-close:focus {
                outline: 2px solid #3B82F6;
                outline-offset: 1px;
            }

            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: currentColor;
                opacity: 0.3;
                transition: width linear;
            }

            @media (max-width: 640px) {
                .notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }

                .notification {
                    transform: translateY(-100%);
                }

                .notification.show {
                    transform: translateY(0);
                }

                .notification.hide {
                    transform: translateY(-100%);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .notification {
                    transition: opacity 0.2s ease;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 5000,
            persistent = false,
            action = null
        } = typeof options === 'string' ? { message: options } : options;

        const id = Date.now() + Math.random();
        const notification = this.createNotification({
            id,
            type,
            title,
            message,
            duration,
            persistent,
            action
        });

        this.container.appendChild(notification);
        this.notifications.set(id, notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto dismiss
        if (!persistent && duration > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, duration);
        }

        return id;
    }

    createNotification({ id, type, title, message, duration, persistent, action }) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
        notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        notification.dataset.id = id;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div class="notification-icon" aria-hidden="true">${icons[type]}</div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${this.escapeHtml(title)}</div>` : ''}
                ${message ? `<div class="notification-message">${this.escapeHtml(message)}</div>` : ''}
            </div>
            <button class="notification-close" aria-label="Close notification" title="Close">
                ×
            </button>
            ${!persistent && duration > 0 ? `<div class="notification-progress" style="width: 100%; transition-duration: ${duration}ms;"></div>` : ''}
        `;

        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.dismiss(id);
        });

        // Progress bar animation
        if (!persistent && duration > 0) {
            const progress = notification.querySelector('.notification-progress');
            if (progress) {
                requestAnimationFrame(() => {
                    progress.style.width = '0%';
                });
            }
        }

        return notification;
    }

    dismiss(id) {
        const notification = this.notifications.get(id);
        if (!notification) return;

        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications.delete(id);
        }, 400);
    }

    dismissAll() {
        this.notifications.forEach((_, id) => {
            this.dismiss(id);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    remove(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Convenience methods
    success(title, message, options = {}) {
        return this.show({ ...options, type: 'success', title, message });
    }

    error(title, message, options = {}) {
        return this.show({ ...options, type: 'error', title, message, duration: 8000 });
    }

    warning(title, message, options = {}) {
        return this.show({ ...options, type: 'warning', title, message });
    }

    info(title, message, options = {}) {
        return this.show({ ...options, type: 'info', title, message });
    }
}

// Create global instance
const notifications = new NotificationSystem();

export { notifications };
