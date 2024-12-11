```javascript
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <p>This is a paragraph</p>
      <MyComponent/>
    </div>
  );
}

// components/MyComponent.js
export default function MyComponent() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/data');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (data === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Data from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> 
    </div>
  );
}

// pages/api/data.js
export default async function handler(req, res) {
  // Simulate a delay to reproduce the error
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.status(200).json({ message: 'Hello from API!' });
}
```