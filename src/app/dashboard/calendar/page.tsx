'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [multiDate, setMultiDate] = useState<Date[] | undefined>([new Date()]);

  const smallDate = date?.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex-col sm:flex-wrap sm:flex sm:flex-row gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
        disabled={(date) => date > new Date()}
      />
      <Calendar
        mode="multiple"
        selected={multiDate}
        onSelect={setMultiDate}
        className="rounded-md border shadow"
      />

      <div>
        <h1 className="text-3xl">Information</h1>
        <div className="border-b"></div>
        <p>{smallDate}</p>
        <p>{multiDate?.map((date) => date.toLocaleDateString('en-US')).join(', ')}</p>
      </div>
    </div>
  );
}
