import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.get('/job', async() => {
    const jobs = await prisma.job.findMany()

    return { jobs }
})

app.post('/jobs', async(request, replay) => {
    const createJobSchema = z.object({
        title: z.string(),
        description: z.string(),
        salary: z.string(),
        company: z.string(),
        email: z.string().email(),
        new_job: z.number()
    })

    const { title, description, salary, company, email, new_job } = createJobSchema.parse(request.body)

    await prisma.job.create({
        data:{
            title,
            description,
            salary,
            company,
            email,
            new_job
        }
    })

    return replay.status(201).send()
    
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HHTTP server Running...')
})