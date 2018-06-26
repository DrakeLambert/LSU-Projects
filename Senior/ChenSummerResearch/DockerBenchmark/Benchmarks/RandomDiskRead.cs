using System;
using System.IO;

namespace DockerBenchmark.Benchmarks
{
    public class RandomDiskRead : ITimedBenchmark, IDisposable
    {
        private FileStream _fileStream;

        private string _filePath;

        private byte[] _testBytes = new byte[1000000];

        private Random _random = new Random();

        private readonly int _readLength = 10;

        public RandomDiskRead()
        {
            _filePath = Path.GetTempFileName();
            _fileStream = File.Create(_filePath);
            _random.NextBytes(_testBytes);
            _fileStream.Write(_testBytes, 0, _testBytes.Length);
            _fileStream.Flush();
        }

        public void Dispose()
        {
            _fileStream.Dispose();
            File.Delete(_filePath);
        }

        public void DoWork()
        {
            for (var i = 0; i < 1000000; i++)
            {
                _fileStream.Seek(_random.Next(0, _testBytes.Length - _readLength), SeekOrigin.Begin);
                _fileStream.Read(new byte[_readLength], 0, _readLength);
            }
        }
    }
}