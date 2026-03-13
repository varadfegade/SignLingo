import React, { useRef, useState, useEffect } from 'react';
import './MagneticButton.css';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    magneticPull?: number; // How strong the pull is 
    actionType?: 'primary' | 'secondary';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
    children, 
    magneticPull = 0.4, 
    actionType = 'primary',
    className = '',
    ...props 
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (!buttonRef.current) return;
        
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        
        // Calculate center of the button
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const distX = clientX - centerX;
        const distY = clientY - centerY;

        // Apply magnetic pull
        setPosition({ x: distX * magneticPull, y: distY * magneticPull });
        setTextPosition({ x: distX * (magneticPull * 0.5), y: distY * (magneticPull * 0.5) });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setPosition({ x: 0, y: 0 });
        setTextPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const combinedClasses = `magnetic-wrapper ${actionType === 'primary' ? 'mag-primary' : 'mag-secondary'} ${className}`;

    return (
        <button
            ref={buttonRef}
            className={combinedClasses}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            {...props}
        >
            <span 
                ref={textRef}
                className="magnetic-text"
                style={{
                    transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                }}
            >
                {children}
            </span>
            {isHovering && <div className="hover-halo" />}
        </button>
    );
};

export default MagneticButton;
