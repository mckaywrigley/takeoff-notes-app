# Frontend Instructions

Follow these instructions to create new frontend components.

## Guidelines

- Always use the hooks from @/hooks/use-toast to show toasts.

### Project Structure

- The components folders is at the root of the project.
- Please put all components that you create in the components folder.
- Do not create any new components folders, just use the existing one.
- Please group similar components in the same folder within the components folder.
- All types are going to come from the table schema found in the `db/schema` files

### Server Components

- Please use server components to fetch data and pass the data to the client components.

### Client Components

- Client components need 'use client' at the top of the file. So anytime you use useState, useEffect, useContext, useRef, etc. you need to use 'use client' at the top of the file.
- Always use client components for user interaction and other client-specific logic.
