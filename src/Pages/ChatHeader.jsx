// components/ChatHeader.jsx
import React from 'react';
import { RefreshCcw, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatHeader = ({ onStatisticsClick, onRefreshClick, showBackButton = false, onBackClick }) => {
    return (
        <>
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">CB</span>
                    </div>
                    <h2 className="text-xl font-semibold">Chat Bot</h2>
                </div>

                <div className="flex items-center gap-2">
                    {showBackButton ? (
                        <Button variant="ghost" onClick={onBackClick}>
                            Back to Chat
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={onStatisticsClick}>
                                <BarChart className="w-5 h-5 mr-1" />
                                Statistics
                            </Button>
                            <Button variant="ghost" onClick={onRefreshClick}>
                                <RefreshCcw className="w-5 h-5" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ChatHeader
