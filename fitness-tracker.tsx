import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Calendar, Clock, Play, Plus, Search, Trash, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

const FitnessApp = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showWorkoutBuilder, setShowWorkoutBuilder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseList, setShowExerciseList] = useState(false);

  // Exercise progress data
  const exerciseProgress = {
    'Push-ups': [
      { date: '1/1', weight: 0, reps: 15 },
      { date: '1/8', weight: 0, reps: 17 },
      { date: '1/15', weight: 0, reps: 20 },
      { date: '1/22', weight: 0, reps: 22 },
    ],
    Squats: [
      { date: '1/1', weight: 95, reps: 12 },
      { date: '1/8', weight: 105, reps: 12 },
      { date: '1/15', weight: 115, reps: 10 },
      { date: '1/22', weight: 125, reps: 10 },
    ],
  };

  // Sample exercise library with animations/images
  const exerciseLibrary = [
    {
      id: 1,
      name: 'Push-ups',
      muscle: 'Chest',
      equipment: 'None',
      difficulty: 'Beginner',
      animation: '/api/placeholder/300/200',
      instructions: [
        'Start in a plank position',
        'Lower your body until chest nearly touches ground',
        'Push back up to starting position',
        'Repeat',
      ],
    },
    {
      id: 2,
      name: 'Squats',
      muscle: 'Legs',
      equipment: 'None',
      difficulty: 'Beginner',
      animation: '/api/placeholder/300/200',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower your body as if sitting back into a chair',
        'Keep chest up and back straight',
        'Return to standing position',
      ],
    },
    // ... more exercises
  ];

  // Sample workouts
  const workoutTemplates = [
    {
      id: 1,
      name: 'Full Body Blast',
      difficulty: 'Beginner',
      duration: '30 mins',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 15 },
        { name: 'Squats', sets: 3, reps: 12 },
      ],
    },
    // ... more workouts
  ];

  // Workout builder state
  const [customWorkout, setCustomWorkout] = useState({
    name: '',
    difficulty: 'Beginner',
    exercises: [],
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
    // Your workout builder component code here
    <div>Workout Builder</div>
  );

  const renderScheduler = () => (
    // Your scheduler component code here
    <div>Scheduler</div>
  );

  const renderExerciseProgress = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Exercise Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exerciseProgress['Push-ups']}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="reps"
                stroke="#2563eb"
                name="Reps"
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#16a34a"
                name="Weight (lbs)"
              />
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
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
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
        {workoutTemplates
          .filter(
            (workout) =>
              (selectedDifficulty === 'all' ||
                workout.difficulty === selectedDifficulty) &&
              workout.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((workout) => (
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
                        onClick={() =>
                          setSelectedExercise(
                            exerciseLibrary.find((e) => e.name === exercise.name)
                          )
                        }
                      >
                        <span>{exercise.name}</span>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <span>{exercise.sets} sets</span>
                          <span>×</span>
                          <span>{exercise.reps} reps</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => setShowScheduler(true)}
                    className="flex items-center space-x-1 px-3 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                  </button>
                  <button
                    onClick={() => {
                      // Start workout logic here
                    }}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="flex space-x-4">
        <button
          onClick={() => setSelectedTab('dashboard')}
          className={`px-4 py-2 rounded ${
            selectedTab === 'dashboard'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelectedTab('workouts')}
          className={`px-4 py-2 rounded ${
            selectedTab === 'workouts'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          Workouts
        </button>
        <button
          onClick={() => setSelectedTab('progress')}
          className={`px-4 py-2 rounded ${
            selectedTab === 'progress'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          Progress
        </button>
      </nav>

      {/* Content */}
      <div className="mt-6">
        {selectedTab === 'dashboard' && (
          <div>
            {/* Dashboard content */}
            {renderExerciseProgress()}
          </div>
        )}
        {selectedTab === 'workouts' && renderWorkouts()}
        {selectedTab === 'progress' && (
          <div>
            {/* Progress content */}
          </div>
        )}
      </div>
      {showWorkoutBuilder && renderWorkoutBuilder()}
      {showScheduler && renderScheduler()}
      {renderExerciseModal()}
    </div>
  );
};

export default FitnessApp;
