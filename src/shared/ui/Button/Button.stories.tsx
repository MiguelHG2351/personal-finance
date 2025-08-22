import React from 'react';
import { Button } from './';

// Example usage component for documentation
export const ButtonExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex gap-4 flex-wrap">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <Button leftIcon={<span>📁</span>}>With Left Icon</Button>
          <Button rightIcon={<span>→</span>}>With Right Icon</Button>
          <Button leftIcon={<span>💾</span>} rightIcon={<span>✓</span>}>
            Both Icons
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonExamples;
