using System;
using Microsoft.AspNetCore.Http;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Common.Extensions;

namespace Radarr.Http.Middleware
{
    public interface ICacheableSpecification
    {
        bool IsCacheable(HttpRequest request);
    }

    public class CacheableSpecification : ICacheableSpecification
    {
        public bool IsCacheable(HttpRequest request)
        {
            if (!RuntimeInfo.IsProduction)
            {
                return false;
            }

            if (request.Query.ContainsKey("h"))
            {
                return true;
            }

            if (request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase))
            {
                if (request.Path.ToString().ContainsIgnoreCase("/MediaCover"))
                {
                    return true;
                }

                return false;
            }

            if (request.Path.StartsWithSegments("/signalr", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var path = request.Path.Value ?? "";

            if (path.EndsWith("/index.js"))
            {
                return false;
            }

            if (path.EndsWith("/initialize.json"))
            {
                return false;
            }

            if (path.StartsWith("/feed", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            if ((path.StartsWith("/logfile", StringComparison.OrdinalIgnoreCase) ||
                path.StartsWith("/updatelogfile", StringComparison.OrdinalIgnoreCase)) &&
                path.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            return true;
        }
    }
}
