import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Home = () => {

  return (
    <section>
      <Card className="w-6/12 m-auto mt-12 ">
        <CardHeader>
          <CardTitle><h2>Welcome to PedalDashboard</h2></CardTitle>
          <CardDescription>Your personal space for tone exploration.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Whether you're a tone chaser, gear nerd, or just dreaming up your perfect setup, Pedal Dashboard is here to help. Build, customize, and save your dream pedalboards, catalog your gear collection, and experiment with different setups — all in one easy-to-use dashboard.</p>
        </CardContent>
        <CardFooter>
          <p>Start creating. Start dreaming. Start playing.</p>
        </CardFooter>
      </Card>
    </section >
  )
}

export { Home }
