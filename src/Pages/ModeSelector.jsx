// components/ModeSelector.jsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModeSelector = ({ onModeSelect }) => {
    const modes = ['Class', 'Student', 'Self', 'Open'];

    return (
        <div className="p-4">
            <p className="mb-2 text-center">Please select a mode to continue:</p>
            <Tabs defaultValue="Class" onValueChange={onModeSelect} className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                    {modes.map((mode) => (
                        <TabsTrigger key={mode} value={mode}>
                            {mode}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    )
}

export default ModeSelector
