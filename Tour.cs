using System.Collections.Generic;
 
namespace TspSA.Domain
{
    public class Tour
    {
        private readonly City[] _route;
        private double _totalDistance;
 
        public Tour(params City[] route)
        {
            _route = route;
        }
 
        public IEnumerable<City> Route { get { return _route; } }
 
        public Tour Swap(int indexOfCity1, int indexOfCity2)
        {
            var copy = new City[_route.Length];
            _route.CopyTo(copy, 0);
 
            var s = copy[indexOfCity1];
            copy[indexOfCity1] = copy[indexOfCity2];
            copy[indexOfCity2] = s;
 
            return new Tour(copy);
        }
 
        public double TotalDistance
        {
            get
            {
                if (_totalDistance == 0)
                {
                    for (var i = 0; i < _route.Length; i++)
                    {
                        var j = (i + 1)%_route.Length;
                        _totalDistance += _route[i].DistanceTo(_route[j]);
                    }
                }
                 
                return _totalDistance;
            }
        }
 
        public bool IsBestThan(Tour other)
        {
            return TotalDistance < other.TotalDistance;
        }
    }
}