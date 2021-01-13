export const items = [
  {
    id: 1,
    description: 'Learn React.js',
    done: true
  },
  {
    id: 2,
    description: 'Learn GraphQL',
    done: false
  },
  {
    id: 3,
    description: 'Learn Node',
    done: false
  },
  {
    id: 4,
    description: 'Learn TypeScript',
    done: false
  }
];

export const getId = () => {
  return Math.max(...items.map(i => i.id)) + 1;
};

export const findItem = id => {
  return items.find(t => t.id === id);
};
