// utils/api.js
export const fetchBotResponse = async (intervention, mode, selection) => {
    // In a real app, this would call your Python API
    try {
      // Mock API call
      console.log('Calling API with:', { intervention, mode, selection });
      
      // Simulate API response time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response data
      return [
        {
          id: 'resp1',
          content: 'This is the first suggested response for the intervention. It provides guidance based on the selected mode and context.',
          mode,
          selection
        },
        {
          id: 'resp2',
          content: 'This is an alternative approach to address the situation. It offers different perspectives and strategies.',
          mode,
          selection
        },
        {
          id: 'resp3',
          content: 'This response provides specific recommendations tailored to the intervention and selected context.',
          mode,
          selection
        }
      ];
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  };