namespace ThorgaApi.Dtos;

public record RegisterRequest(string FullName, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record AuthResponse(string Token, string Email, string FullName);
public record MemberDto(int Id, string FullName, string Email, string Phone, string Address, string MembershipType, DateTime CreatedAt);
