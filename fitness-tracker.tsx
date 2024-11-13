import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Calendar, Activity, Weight, Award, TrendingUp, Clock, Play, 
  Plus, CheckCircle, Search, Filter, Save, Edit, Trash, ChevronDown,
  Calendar as CalendarIcon, ArrowRight, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FitnessApp = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showWorkoutBuilder, setShowWorkoutBuilder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Exercise progress data
  const exerciseProgress = {
    "Push-ups": [
      { date: '1/1', weight: 0, reps: 15 },
      { date: '1/8', weight: 0, reps: 17 },
      { date: '1/15', weight: 0, reps: 20 },
      { date: '1/22', weight: 0, reps: 22 }
    ],
    "Squats": [
      { date: '1/1', weight: 95, reps: 12 },
      { date: '1/8', weight: 105, reps: 12 },
      { date: '1/15', weight: 115, reps: 10 },
      { date: '1/22', weight: 125, reps: 10 }
    ]
  };

  // Sample exercise library with animations/images
  const exerciseLibrary = [
    {
      id: 1,
      name: "Push-ups",
      muscle: "Chest",
      equipment: "None",
      difficulty: "Beginner",
      animation: "/api/placeholder/300/200",
      instructions: [
        "Start in a plank position",
        "Lower your body until chest nearly touches ground",
        "Push back up to starting position",
        "Repeat"
      ]
    },
    {
      id: 2,
      name: "Squats",
      muscle: "Legs",
      equipment: "None",
      difficulty: "Beginner",
      animation: "/api/placeholder/300/200",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Lower your body as if sitting back into a chair",
        "Keep chest up and back straight",
        "Return to standing position"
      ]
    },
    // ... more exercises
  ];

  // Workout builder state
  const [customWorkout, setCustomWorkout] = useState({
    name: "",
    difficulty: "Beginner",
    exercises: []
  });

  const renderExerciseModal = () => {
    if (!selectedExercise) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
            <button onClick={() => setSelectedExercise(null)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <img 
            src={selectedExercise.animation} 
            alt={selectedExercise.name} 
            className="w-full rounded-lg"
          />
          
          <div className="space-y-2">
            <p className="font-medium">Instructions:</p>
            <ol className="list-decimal list-inside space-y-1">
              {selectedExercise.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Muscle Group</p>
              <p>{selectedExercise.muscle}</p>
            </div>
            <div>
              <p className="font-medium">Equipment</p>
              <p>{selectedExercise.equipment}</p>
            </div>
            <div>
              <p className="font-medium">Difficulty</p>
              <p>{selectedExercise.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkoutBuilder = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Create Custom Workout</h3>
            <button onClick={() => setShowWorkoutBuilder(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Workout Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={customWorkout.name}
                onChange={(e) => setCustomWorkout({...customWorkout, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                className="w-full p-2 border rounded"
                value={customWorkout.difficulty}
                onChange={(e) => setCustomWorkout({...customWorkout, difficulty: e.target.value})}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Exercises</label>
              <div className="space-y-2">
                {customWorkout.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                    <span>{exercise.name}</span>
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) => {
                        const newExercises = [...customWorkout.exercises];
                        newExercises[idx].sets = e.target.value;
                        setCustomWorkout({...customWorkout, exercises: newExercises});
                      }}
                    />
                    <span>×</span>
                    <input
                      type="number"
                      className="w-16 p-1 border rounded"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) => {
                        const newExercises = [...customWorkout.exercises];
                        newExercises[idx].reps = e.target.value;
                        setCustomWorkout({...customWorkout, exercises: newExercises});
                      }}
                    />
                    <button
                      onClick={() => {
                        const newExercises = customWorkout.exercises.filter((_, i) => i !== idx);
                        setCustomWorkout({...customWorkout, exercises: newExercises});
                      }}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowExerciseList(true)}
                className="mt-2 flex items-center space-x-2 text-blue-500"
              >
                <Plus className="w-4 h-4" />
                <span>Add Exercise</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowWorkoutBuilder(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Save workout logic here
                setShowWorkoutBuilder(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduler = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Schedule Workout</h3>
            <button onClick={() => setShowScheduler(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => (
              <button
                key={i}
                className="aspect-square p-2 border rounded hover:bg-blue-50"
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input type="time" className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Repeat</label>
              <select className="w-full p-2 border rounded">
                <option>Never</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reminder</label>
              <select className="w-full p-2 border rounded">
                <option>15 minutes before</option>
                <option>30 minutes before</option>
                <option>1 hour before</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowScheduler(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExerciseProgress = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Exercise Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exerciseProgress["Push-ups"]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reps" stroke="#2563eb" name="Reps" />
              <Line type="monotone" dataKey="weight" stroke="#16a34a" name="Weight (lbs)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const renderWorkouts = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <select
          className="px-4 py-2 border rounded-lg"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button
          onClick={() => setShowWorkoutBuilder(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5" />
          <span>Create Workout</span>
        </button>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutTemplates.map((workout) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{workout.name}</span>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {workout.difficulty}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{workout.duration}</span>
                </div>
                
                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedExercise(exerciseLibrary.find(e => e.name === exercise.name))}
                    >
                      <span>{exercise.name}</span>