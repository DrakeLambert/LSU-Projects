using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DockerBenchmark.Benchmarks;

namespace DockerBenchmark
{
    class Program
    {
        static void Main(string[] args)
        {
            int iterations = 100;
            if (args.Length > 0)
            {
                int.TryParse(args[0], out iterations);
            }

            var benchmarks = new ITimedBenchmark[] {
                new CpuBenchmark(),
                new RandomDiskRead(),
                new SequentialDiskRead()
            }.Select(benchmark => new Task<(string, double)>(() =>
            {
                var stopwatch = new Stopwatch();
                var times = new List<long>();
                for (var i = 0; i < iterations; i++)
                {
                    stopwatch.Start();
                    benchmark.DoWork();
                    stopwatch.Stop();
                    times.Add(stopwatch.ElapsedMilliseconds);
                    stopwatch.Reset();
                }
                if (benchmark is IDisposable disposable)
                {
                    disposable.Dispose();
                }
                return (benchmark.GetType().Name, times.Average());
            }));

            foreach (var benchmark in benchmarks)
            {
                benchmark.Start();
                Console.WriteLine(benchmark.Result);
            }
        }
    }
}