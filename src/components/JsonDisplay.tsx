const JsonDisplay = ({ data }: { data: object }) => {
  return (
    <div className="bg-zinc-900 text-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Payload</h2>
      <pre className="overflow-x-auto text-sm p-2 bg-zinc-800 rounded-md select-text">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default JsonDisplay;
