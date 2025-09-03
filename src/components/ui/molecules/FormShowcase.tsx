import React, { useState } from 'react';
import { Card, Button, Input, Select, Checkbox, RangeSlider } from '../atoms';

export const FormShowcase: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    newsletter: false,
    volume: 50,
    quality: 75
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Advanced Form Components</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name"
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />
        </div>

        <Select
          label="Country"
          options={countries}
          value={formData.country}
          onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
          placeholder="Select your country"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RangeSlider
            label="Volume"
            value={formData.volume}
            onChange={(value) => setFormData(prev => ({ ...prev, volume: value }))}
            min={0}
            max={100}
          />
          
          <RangeSlider
            label="Quality"
            value={formData.quality}
            onChange={(value) => setFormData(prev => ({ ...prev, quality: value }))}
            min={0}
            max={100}
          />
        </div>

        <Checkbox
          checked={formData.newsletter}
          onChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked }))}
          label="Subscribe to newsletter"
        />

        <div className="flex gap-3">
          <Button type="submit" variant="primary">
            Submit Form
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => setFormData({
              name: '', email: '', country: '', newsletter: false, volume: 50, quality: 75
            })}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};