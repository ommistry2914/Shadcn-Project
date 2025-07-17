
// components/ClassStudentSelector.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

const ClassList = ({ classes, selectedClasses, onClassSelect }) => {
    return (
        <ScrollArea className="h-64">
            <div className="p-2 space-y-2">
                {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`class-${cls.id}`}
                            checked={selectedClasses.includes(cls.id)}
                            onCheckedChange={() => onClassSelect(cls.id)}
                        />
                        <label htmlFor={`class-${cls.id}`} className="text-sm font-medium">
                            {cls.name}
                        </label>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

const StudentList = ({ students, selectedStudents, onStudentSelect }) => {
    return (
        <ScrollArea className="h-64">
            <div className="p-2 space-y-2">
                {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`student-${student.id}`}
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => onStudentSelect(student.id)}
                        />
                        <label htmlFor={`student-${student.id}`} className="text-sm font-medium">
                            {student.name}
                        </label>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};





const ClassStudentSelector = ({ mode, onSelectionComplete }) => {

    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [dialogStep, setDialogStep] = useState('class');
    const [open, setOpen] = useState(false);

    // Mock data - in a real app, you would fetch this from an API
    const classes = [
        { id: 1, name: "Class 1" },
        { id: 2, name: "Class 2" },
        { id: 3, name: "Class 3" },
        { id: 4, name: "Class 4" },
    ];

    const students = [
        { id: 1, name: "Student 1", classId: 1 },
        { id: 2, name: "Student 2", classId: 1 },
        { id: 3, name: "Student 3", classId: 2 },
        { id: 4, name: "Student 4", classId: 2 },
        { id: 5, name: "Student 5", classId: 3 },
        { id: 6, name: "Student 6", classId: 4 },
    ];

    const handleClassSelect = (classId) => {
        setSelectedClasses(prev =>
            prev.includes(classId)
                ? prev.filter(id => id !== classId)
                : [...prev, classId]
        );
    };

    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleNext = () => {
        if (mode === 'Class') {
            handleComplete();
        } else if (mode === 'Student') {
            setDialogStep('student');
        }
    };

    const handleComplete = () => {
        let selectionData;

        if (mode === 'Class') {
            selectionData = {
                mode,
                classes: classes.filter(cls => selectedClasses.includes(cls.id))
            };
        } else if (mode === 'Student') {
            selectionData = {
                mode,
                classes: classes.filter(cls => selectedClasses.includes(cls.id)),
                students: students.filter(student => selectedStudents.includes(student.id))
            };
        }

        onSelectionComplete(selectionData);
        setOpen(false);
        setDialogStep('class');
    };

    const filteredStudents = dialogStep === 'student'
        ? students.filter(student => selectedClasses.includes(student.classId))
        : [];


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">
                        {mode === 'Class' ? 'Select Classes' : 'Select Students'}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogStep === 'class'
                                ? 'Select Classes'
                                : 'Select Students'}
                        </DialogTitle>
                    </DialogHeader>

                    {dialogStep === 'class' ? (
                        <ClassList
                            classes={classes}
                            selectedClasses={selectedClasses}
                            onClassSelect={handleClassSelect}
                        />
                    ) : (
                        <StudentList
                            students={filteredStudents}
                            selectedStudents={selectedStudents}
                            onStudentSelect={handleStudentSelect}
                        />
                    )}

                    <div className="flex justify-end space-x-2">
                        {dialogStep === 'student' && (
                            <Button variant="outline" onClick={() => setDialogStep('class')}>
                                Back
                            </Button>
                        )}
                        {dialogStep === 'class' ? (
                            <Button onClick={handleNext} disabled={selectedClasses.length === 0}>
                                {mode === 'Class' ? 'Complete' : 'Next'}
                            </Button>
                        ) : (
                            <Button onClick={handleComplete} disabled={selectedStudents.length === 0}>
                                Complete
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ClassStudentSelector
