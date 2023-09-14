import { Github, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { PromptSelect } from './components/prompt-select';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Slider } from './components/ui/slider';
import { Textarea } from './components/ui/textarea';
import { VideoInputForm } from './components/video-input-form';
import { useCompletion } from 'ai/react';

export const App = () => {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(
    null,
  );

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/generate',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return (
    <main className='min-h-screen flex flex-col'>
      {/* HEADER */}
      <header className='px-6 py-3 flex items-center justify-between border-b'>
        <h1 className='text-xl font-bold'>upload.ai</h1>

        <section className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>
            Desenvolvido com 💙 no NLW da Rocketseat
          </span>

          <Separator
            orientation='vertical'
            className='h-6'
          />

          <Button variant='outline'>
            <Github className='w-4 h-4 mr-2' />
            GitHub
          </Button>
        </section>
      </header>

      {/* CONTENT */}
      <section className='p-6 flex-1 flex gap-6'>
        {/* Left */}
        <article className='flex-1 flex flex-col gap-4'>
          <div className='flex-1 grid grid-rows-2 gap-6'>
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA'
              readOnly
              value={completion}
            />
          </div>

          <p>
            Lembre-se: você pode utilizar a variável{' '}
            <code className='text-blue-400'>{`{transcription}`}</code>{' '}
            no seu prompt para adicionar o conteúdo da
            transcrição do vídeo selecionado.
          </p>
        </article>

        {/* Right */}
        <aside className='w-80 space-y-6'>
          {/* Vídeo */}
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          {/* Config */}
          <form
            className='space-y-6'
            onSubmit={handleSubmit}
          >
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>
                    GPT 3.5-turbo 16k
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-sm text-muted-foreground italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) =>
                  setTemperature(value[0])
                }
              />
              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                Valores mais altor tendem a deixar o
                resultado mais criativo e com possíveis
                erros.
              </span>
            </div>

            <Separator />

            <Button
              disabled={isLoading}
              type='submit'
              className='w-full'
            >
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
        </aside>
      </section>
    </main>
  );
};
