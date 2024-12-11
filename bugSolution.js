```javascript
// components/MyComponent.js
export default function MyComponent() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data', {
          signal: AbortController().signal, // to stop pending fetch calls
          timeout: 5000, // adding a timeout
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Failed to fetch data: ${errorData.message || res.statusText}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Data from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```