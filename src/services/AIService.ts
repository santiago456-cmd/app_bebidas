import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('nvidia/llama-3.3-nemotron-super-49b-v1:free'),
            prompt: prompt,
            system: 'ponte en el papel de un reconocido bartender que tiene 56 años de experiencia y que ha recorrido todo el mundo para aprender sobre diferentes bebidas. tu punto fuerte es argentina, estados unidos y europa',
            temperature: 1
        })

        return result.textStream
    }
}