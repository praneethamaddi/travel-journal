import React, { useState } from 'react';
import backgroundImage from '../assets/3.jpg'; // Import the image

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newStory, setNewStory] = useState('');
  const [stories, setStories] = useState([
    { id: 1, user: 'Alice', text: 'Just came back from a trip to Paris!', likes: 0, comments: [] },
    { id: 2, user: 'Bob', text: 'Had an amazing time in the mountains!', likes: 0, comments: [] },
    // Add more sample stories as needed
  ]);

  const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D9BF77', '#A8D8EA', '#A3DFF7', '#FFE156'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLike = (id) => {
    setStories(stories.map(story => story.id === id ? { ...story, likes: story.likes + 1 } : story));
  };

  const handleCommentSubmit = (id, comment) => {
    setStories(stories.map(story => story.id === id ? { ...story, comments: [...story.comments, comment] } : story));
  };

  const handleNewStorySubmit = (e) => {
    e.preventDefault();
    if (newStory.trim()) {
      setStories([...stories, { id: Date.now(), user: 'You', text: newStory, likes: 0, comments: [] }]);
      setNewStory('');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Adjust height as necessary
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
      }}
    >
      <header style={{ color: 'white' }}>
        <h1>Travel Journal Community</h1>
      </header>

      {/* Combined Input Card with Search, Textarea, and Button */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <input
          type="text"
          placeholder="Search users or stories..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Share your travel story..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', height: '100px' }}
        />
        <button 
          onClick={handleNewStorySubmit} 
          style={{
            backgroundColor: '#007BFF', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Post Story
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        {stories.filter(story => 
          story.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
          story.text.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((story, index) => (
          <div key={story.id} style={{ backgroundColor: colors[index % colors.length], padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <h3>{story.user}</h3>
            <p>{story.text}</p>
            <div>
              <button onClick={() => handleLike(story.id)}>Like ({story.likes})</button>
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommentSubmit(story.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </div>
            <div>
              <p>Comments: {story.comments.length}</p>
              {story.comments.map((comment, index) => (
                <p key={index}><strong>Comment:</strong> {comment}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
