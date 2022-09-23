import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  console.log("content", content);

  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);

  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');

  // open the object store
  const objStore = tx.objectStore('jate');

  // use the .add() method to pass in content
  const req = objStore.put({ content })

  // confirm the data was added
  const res = await req;
  console.log('data saved to the jateDB', res);
};

// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET to the database.
export const getDb = async (content) => {
  console.log('Getting data from the jateDB');

  // Create a connection to the Jate database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges. 
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const objStore = tx.objectStore('jate');

  // use the .getAll() method to grab all the content in the DB
  const request = objStore.getAll();

  // confirm the data was fetched
  const result = await request;
  // console.log('result.value', result);
  return result.content;
};

initdb();
