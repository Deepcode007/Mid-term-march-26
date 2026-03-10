import React from 'react';

interface CustomCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({ title, description, imageUrl }) => {
  return (
    React.createElement('div',
      React.createElement('img'),
      React.createElement('h2', title),
      React.createElement('p', description)
    )
  );
};
