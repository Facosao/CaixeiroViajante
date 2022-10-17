using System;
 
namespace TspSA.Domain
{
    public class City
    {
        private readonly double _locationX;
        private readonly double _locationY;
 
        public City(double locationX, double locationY)
        {
            _locationX = locationX;
            _locationY = locationY;
        }
 
        public double LocationX
        {
            get { return _locationX; }
        }
 
        public double LocationY
        {
            get { return _locationY; }
        }
 
        public double DistanceTo(City other)
        {
            var dx = other.LocationX - LocationX;
            var dy = other.LocationY - LocationY;
 
            return Math.Sqrt(dx * dx + dy * dy);
        }
    }
}