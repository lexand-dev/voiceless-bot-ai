import { Button } from "@workspace/ui/components/button";
import { add } from "@workspace/math/add";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World / widget</h1>
        <Button size="sm">Button</Button>
        {add(2, 3) === 5 ? (
          <p className="text-green-500">Math works!</p>
        ) : (
          <p className="text-red-500">Math does not work!</p>
        )}
      </div>
    </div>
  );
}
