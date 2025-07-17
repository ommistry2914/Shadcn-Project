// components/ResponseCard.jsx
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveResponse } from '../utils/storage';

const StarRating = ({ rating, onRatingChange }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    className="focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
};



const Responsecard = () => {

    const ResponseCard = ({ response, index, onSelect, isSelected }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [isHelpful, setIsHelpful] = useState(null);
        const [rating, setRating] = useState(0);

        const handleFeedback = (helpful) => {
            setIsHelpful(helpful);

            // Save feedback
            if (isSelected) {
                saveResponse({
                    ...response,
                    helpful,
                    rating,
                    timestamp: new Date().toISOString()
                });
            }
        };

        const handleRatingChange = (newRating) => {
            setRating(newRating);

            // Save rating
            if (isSelected) {
                saveResponse({
                    ...response,
                    rating: newRating,
                    helpful: isHelpful,
                    timestamp: new Date().toISOString()
                });
            }
        };

        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };

        return (
            <div></div>
        );
    };


    return (
        <Card className="mb-4">
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-lg">Response {index + 1}</CardTitle>
                <button
                    onClick={toggleExpand}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </CardHeader>

            {isExpanded && (
                <CardContent className="pt-2">
                    <p>{response.content}</p>
                </CardContent>
            )}

            <CardFooter className="flex justify-between items-center pt-2">
                {!isSelected ? (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelect(response)}
                        className="ml-auto"
                    >
                        Select
                    </Button>
                ) : (
                    <div className="flex items-center space-x-4 w-full justify-between">
                        <div className="flex items-center">
                            <span className="mr-2">Was this helpful?</span>
                            <Button
                                variant={isHelpful === true ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFeedback(true)}
                                className="mr-1"
                            >
                                <ThumbsUp size={16} />
                            </Button>
                            <Button
                                variant={isHelpful === false ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFeedback(false)}
                            >
                                <ThumbsDown size={16} />
                            </Button>
                        </div>

                        <StarRating rating={rating} onRatingChange={handleRatingChange} />

                        <span className="ml-2 text-green-600 flex items-center">
                            <Check size={16} className="mr-1" /> Selected
                        </span>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

export default Responsecard
