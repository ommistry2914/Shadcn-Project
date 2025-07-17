// components/Statistics.jsx
import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { useResponses } from '../hooks/userResponse';

const Statistics = () => {
  const { responses } = useResponses();

  const formattedResponses = useMemo(() => {
    return responses.map(response => {
      const date = new Date(response.timestamp);
      return {
        ...response,
        formattedDate: date.toLocaleDateString(),
        formattedTime: date.toLocaleTimeString(),
      };
    });
  }, [responses]);

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Situation</TableHead>
              <TableHead>Selected Situation</TableHead>
              <TableHead>Helpful</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedResponses.map((response, index) => (
              <TableRow key={index}>
                <TableCell>{response.formattedDate}</TableCell>
                <TableCell>{response.formattedTime}</TableCell>
                <TableCell>{response.mode}</TableCell>
                <TableCell>
                  {response.selection?.classes?.map(cls => cls.name).join(', ')}
                </TableCell>
                <TableCell>
                  {response.selection?.students?.map(student => student.name).join(', ')}
                </TableCell>
                <TableCell>
                  {response.helpful === true && <ThumbsUp className="text-green-500" size={20} />}
                  {response.helpful === false && <ThumbsDown className="text-red-500" size={20} />}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < response.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};