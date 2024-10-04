import React, { useState } from 'react';
import axios from 'axios';

const TextSummarize = () => {
  const [text, setText] = useState('');
  const [minLength, setMinLength] = useState(5);
  const [maxLength, setMaxLength] = useState(100);
  const [summary, setSummary] = useState('');
  const [fileSummary, setfileSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileGenerating, setFileGenerating] = useState(false);
  const [file, setFile] = useState(null);
  const API_KEY = process.env.TEXT_SUMMARIZER_API_KEY;

  const handleSummarize = async () => {
    try {
      setIsGenerating(true);
      const requestData = {
        language: 'auto',
        text: text,
        min_length: minLength,
        max_length: maxLength,
      };

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/summarize`, requestData, {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      setSummary(response.data.result);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async () => {
    setFileGenerating(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/converter`, formData, {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });

      const { name, pageCount, text } = response.data;
      const summaryData = {
        name: name,
        pageCount: pageCount,
        text: text,
      };
      setfileSummary(summaryData);
      setFileGenerating(false);
    } catch (error) {
      console.error('Error uploading and converting file:', error);
      setFileGenerating(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-semibold mb-6">Text Summarizer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
        rows={10}
        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="file"
          accept=".txt, .pdf"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-lg w-full md:w-auto"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          onClick={handleFileUpload}
          disabled={fileGenerating}
        >
          {fileGenerating ? 'Generating...' : 'Upload and Summarize'}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2">Minimum Length:</label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2">Maximum Length:</label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 disabled:opacity-50"
        onClick={handleSummarize}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Summarize'}
      </button>
      {fileSummary && (
        <div className="bg-gray-100 p-4 mt-6 rounded-lg">
          <h2 className="font-semibold mb-2">File Summary:</h2>
          <p><span className="font-bold">Name:</span> {fileSummary.name}</p>
          <p><span className="font-bold">Page Count:</span> {fileSummary.pageCount}</p>
          <p><span className="font-bold">Text:</span> {fileSummary.text}</p>
        </div>
      )}
      {summary && (
        <div className="bg-gray-100 p-4 mt-6 rounded-lg">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarize;
