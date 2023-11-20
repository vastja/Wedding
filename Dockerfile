FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY Wedding/bin/Release/net7.0/publish ./
ENTRYPOINT ["dotnet", "Wedding.dll"]
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080