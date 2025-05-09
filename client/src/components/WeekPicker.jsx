import React, { useState } from 'react';
import { TextInput, Button, Label } from 'flowbite-react';

export const WeekPicker = ({ onWeekSelect }) => {
  const [weekInput, setWeekInput] = useState('');

  const handleWeekChange = (e) => {
    const value = e.target.value;
    setWeekInput(value);
    
    if (value) {
      try {
        // Parse the week input (YYYY-Www format)
        const [year, week] = value.split('-W').map(Number);
        
        // Calculate first day of week (Monday)
        const date = new Date(year, 0, 1 + (week - 1) * 7);
        while (date.getDay() !== 1) { // Adjust to Monday
          date.setDate(date.getDate() - 1);
        }
        
        const weekStart = new Date(date);
        const weekEnd = new Date(date);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        onWeekSelect(weekStart, weekEnd);
      } catch (error) {
        console.error('Error parsing week:', error);
        onWeekSelect(null, null);
      }
    } else {
      onWeekSelect(null, null);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <Label htmlFor="week-picker">Select Week</Label>
        <TextInput
          id="week-picker"
          type="week"
          value={weekInput}
          onChange={handleWeekChange}
          required
        />
      </div>
      {weekInput && (
        <Button
          color="gray"
          onClick={() => {
            setWeekInput('');
            onWeekSelect(null, null);
          }}
          className="mt-6"
        >
          Clear
        </Button>
      )}
    </div>
  );
};