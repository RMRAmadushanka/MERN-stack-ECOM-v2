import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async () => {
  return '';
});

export { removeUser };
