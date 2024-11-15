import React from 'react';

const AnimatedBorder = ({ children }) => {
    return (
        <div className="relative w-64 h-64">
            {/* Rotating gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 animate-spin p-1">
                {/* Inner container */}
                <div className="w-full h-full rounded-full">
                    {/* Content container */}
                    <div className="w-full h-full rounded-full overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Example usage component
const Example = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <AnimatedBorder>
                {/* Replace this img with your actual city illustration */}
                {/* <img src="Realestatepng.png" alt="City Illustration" /> */}
                
            </AnimatedBorder>
        </div>
    );
};

export default Example;