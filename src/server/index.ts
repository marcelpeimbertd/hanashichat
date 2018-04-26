import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('*', (req, res, next) => { res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); });
app.listen(3000, () => { console.log('server running on port 3000'); });
