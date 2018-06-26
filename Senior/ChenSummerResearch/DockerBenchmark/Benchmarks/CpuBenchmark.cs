namespace DockerBenchmark.Benchmarks
{
    public class CpuBenchmark : ITimedBenchmark
    {
        public CpuBenchmark()
        {
        }

        public void DoWork()
        {
            decimal piEstimation = 3;
            for (var i = 0; i < 1000000; i++)
            {
                piEstimation += PiSeries(i);
            }
        }

        private decimal PiSeries(int n)
        {
            decimal result = n % 2 == 0 ? 4 : -4;
            n *= 2;
            return result / (n + 2) / (n + 3) / (n + 4);
        }
    }
}