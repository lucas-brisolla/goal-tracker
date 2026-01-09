import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) =>{
    return res.json({status: 'ok', message: 'Atlas API running' });
});

const PORT = process.env.PORT || 3333;

app.listen (PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
