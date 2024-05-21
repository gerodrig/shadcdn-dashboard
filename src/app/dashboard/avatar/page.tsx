import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Page() {
  return (
    <div className="h-[500px] flex justify-center items-center">
      <Avatar>
        <AvatarImage src="https://github.com/gerodrig.png" alt="@gerodrig" />
        <AvatarFallback>GR</AvatarFallback>
      </Avatar>
      <p className="m-2">@gerodrig</p>
    </div>
  );
}
