CREATE TABLE AspNetRoles
(
    Id NVARCHAR(450) PRIMARY KEY,
    Name NVARCHAR(256) NULL,
    NormalizedName NVARCHAR(256) NULL,
    ConcurrencyStamp NVARCHAR(MAX) NULL
);

CREATE TABLE AspNetRoleClaims
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RoleId NVARCHAR(450) NOT NULL,
    ClaimType NVARCHAR(MAX) NULL,
    ClaimValue NVARCHAR(MAX) NULL,
    CONSTRAINT FK_AspNetRoleClaims_AspNetRoles_RoleId
        FOREIGN KEY (RoleId)
        REFERENCES AspNetRoles(Id)
        ON DELETE CASCADE
);

CREATE TABLE AspNetUsers
(
    Id NVARCHAR(450) PRIMARY KEY,
    UserName NVARCHAR(256),
    NormalizedUserName NVARCHAR(256),
    Email NVARCHAR(256),
    NormalizedEmail NVARCHAR(256),
    EmailConfirmed BIT NOT NULL DEFAULT 0,
    PasswordHash NVARCHAR(MAX),
    SecurityStamp NVARCHAR(MAX),
    ConcurrencyStamp NVARCHAR(MAX),
    PhoneNumber NVARCHAR(MAX),
    PhoneNumberConfirmed BIT NOT NULL DEFAULT 0,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnd DATETIMEOFFSET NULL,
    LockoutEnabled BIT NOT NULL DEFAULT 1,
    AccessFailedCount INT NOT NULL DEFAULT 0,
    FullName NVARCHAR(255),
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE AspNetUserRoles
(
    UserId NVARCHAR(450) NOT NULL,
    RoleId NVARCHAR(450) NOT NULL,
    PRIMARY KEY (UserId, RoleId),
    CONSTRAINT FK_AspNetUserRoles_AspNetUsers_UserId
        FOREIGN KEY (UserId)
        REFERENCES AspNetUsers(Id)
        ON DELETE CASCADE,
    CONSTRAINT FK_AspNetUserRoles_AspNetRoles_RoleId
        FOREIGN KEY (RoleId)
        REFERENCES AspNetRoles(Id)
        ON DELETE CASCADE
);

CREATE TABLE AspNetUserClaims
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId NVARCHAR(450) NOT NULL,
    ClaimType NVARCHAR(MAX) NULL,
    ClaimValue NVARCHAR(MAX) NULL,
    CONSTRAINT FK_AspNetUserClaims_AspNetUsers_UserId
        FOREIGN KEY (UserId)
        REFERENCES AspNetUsers(Id)
        ON DELETE CASCADE
);

CREATE TABLE AspNetUserLogins
(
    LoginProvider NVARCHAR(450) NOT NULL,
    ProviderKey NVARCHAR(450) NOT NULL,
    ProviderDisplayName NVARCHAR(MAX) NULL,
    UserId NVARCHAR(450) NOT NULL,
    PRIMARY KEY (LoginProvider, ProviderKey),
    CONSTRAINT FK_AspNetUserLogins_AspNetUsers_UserId
        FOREIGN KEY (UserId)
        REFERENCES AspNetUsers(Id)
        ON DELETE CASCADE
);

CREATE TABLE AspNetUserTokens
(
    UserId NVARCHAR(450) NOT NULL,
    LoginProvider NVARCHAR(450) NOT NULL,
    Name NVARCHAR(450) NOT NULL,
    Value NVARCHAR(MAX) NULL,
    PRIMARY KEY (UserId, LoginProvider, Name),
    CONSTRAINT FK_AspNetUserTokens_AspNetUsers_UserId
        FOREIGN KEY (UserId)
        REFERENCES AspNetUsers(Id)
        ON DELETE CASCADE
);

CREATE TABLE Members
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Phone NVARCHAR(50) NOT NULL,
    Address NVARCHAR(500) NOT NULL,
    MembershipType NVARCHAR(50) NOT NULL DEFAULT 'Regular',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UserId NVARCHAR(450) NULL,

    CONSTRAINT FK_Members_AspNetUsers_UserId
        FOREIGN KEY (UserId)
        REFERENCES AspNetUsers(Id)
        ON DELETE SET NULL
);

CREATE TABLE SiteContents
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Category NVARCHAR(100) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    Summary NVARCHAR(1000) NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE PersonProfiles
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Category NVARCHAR(100) NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Position NVARCHAR(255) NULL,
    Description NVARCHAR(MAX) NULL,
    ImageUrl NVARCHAR(500) NULL,
    ExternalLink NVARCHAR(500) NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE SiteImages
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Category NVARCHAR(100) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(1000) NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE SiteRolePermissions
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(256) NOT NULL,
    Permission NVARCHAR(256) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);