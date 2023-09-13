import { Button } from './components/ui/button';
import { FileVideo, Github, Wand2 } from 'lucide-react';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { UploadIcon } from '@radix-ui/react-icons';
import {
  SelectContent,
  SelectItem,
  SelectValue,
  Select,
  SelectTrigger,
} from './components/ui/select';
import { Slider } from './components/ui/slider';

export const App = () => {
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
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA'
              readOnly
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
          <form className='space-y-6'>
            <label
              htmlFor='video'
              className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
              <FileVideo className='w-4 h-4' />
              Selecione um vídeo
            </label>

            <input
              type='file'
              id='video'
              accept='video/mp4'
              className='sr-only'
            />

            <Separator />

            <div className='space-y-2'>
              <Label htmlFor='transcription_prompt'>
                Prompt de transcrição
              </Label>
              <Textarea
                id='transcription_prompt'
                className='h-20 leading-relaxed resize-none'
                placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'
              />
            </div>

            <Button type='submit' className='w-full'>
              Carregar video
              <UploadIcon className='w-4 h-4 ml-2' />
            </Button>
          </form>

          <Separator />

          {/* Config */}
          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione um prompt' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='title'>
                    Título do YouTube
                  </SelectItem>
                  <SelectItem value='description'>
                    Descrição do YouTube
                  </SelectItem>
                </SelectContent>
              </Select>
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
              <Slider min={0} max={1} step={0.1} />
              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                Valores mais altor tendem a deixar o
                resultado mais criativo e com possíveis
                erros.
              </span>
            </div>

            <Separator />

            <Button type='submit' className='w-full'>
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
        </aside>
      </section>
    </main>
  );
};
