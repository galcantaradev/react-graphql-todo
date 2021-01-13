import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

import { items, getId, findItem } from './data.mjs';

const PORT = 4000;
const app = express();

const schema = buildSchema(`
  type TodoItem {
    id: ID
    description: String!
    done: Boolean
  }

  input TodoItemInput {
    description: String!
    done: Boolean
  }

  type Query {
    todos: [TodoItem]
  }

  type Mutation {
    save(todoItem: TodoItemInput): TodoItem
    updateById(id: Int, updates: TodoItemInput): Boolean
    deleteById(id: Int): Boolean
  }
`);

const resolvers = {
  todos: () => items,
  save: args => {
    const newTodo = {
      ...args.todoItem,
      id: getId()
    };

    items.push(newTodo);

    return newTodo;
  },
  updateById: args => {
    const { id, updates } = args;

    const item = findItem(id);
    const index = items.indexOf(item);

    if (!item) {
      return false;
    }

    const newItem = {
      ...item,
      ...updates
    };

    items.splice(index, 1, newItem);

    return true;
  },
  deleteById: args => {
    const item = findItem(args.id);

    if (!item) {
      return false;
    }

    const index = items.indexOf(item);
    items.splice(index, 1);

    return true;
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
