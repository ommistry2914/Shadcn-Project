// utils/storage.js
export const saveResponse = async (response) => {
    try {
      // Get existing responses
      const responses = await getResponses();
      
      // Generate a unique filename
      const filename = `response_${responses.length + 1}.json`;
      
      // In a real app, this would save to a file or database
      // For this example, we'll use localStorage
      const updatedResponses = [...responses, { ...response, filename }];
      localStorage.setItem('chatbot_responses', JSON.stringify(updatedResponses));
      
      console.log('Saved response:', filename);
      return filename;
    } catch (error) {
      console.error('Error saving response:', error);
      throw error;
    }
  };
  
  export const getResponses = async () => {
    try {
      // In a real app, this would read from files or a database
      // For this example, we'll use localStorage
      const data = localStorage.getItem('chatbot_responses');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading responses:', error);
      return [];
    }
  };
  