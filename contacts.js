import crypto from "node:crypto";
import * as fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.resolve("contacts.json");



  async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  }

  function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);

    if(typeof contact === undefined) {
        return null;
    }

    return contact
  }
  
  async function removeContact(contactId) {
   
    const contacts = await  listContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const removedContact = contacts[index];

    const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

    await writeContacts(newContacts)

    return removedContact;

  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts()

    const newContact = {name, email, phone, id:crypto.randomUUID()};

    contacts.push(newContact);

    await writeContacts(contacts);
    
    return newContact;
  }

  export {listContacts, getContactById, removeContact, addContact};
  