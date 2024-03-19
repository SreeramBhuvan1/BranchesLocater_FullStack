using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    CityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.CityId);
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BU_Codes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opened_dt = table.Column<DateOnly>(type: "date", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Business_Hours = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Branches_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "CityId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityId", "CityName", "Country", "State" },
                values: new object[,]
                {
                    { 1, "EDMONTON", "Canada", "Alberta" },
                    { 2, "ACHESON", "Canada", "Alberta" }
                });

            migrationBuilder.InsertData(
                table: "Branches",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "CityId", "Currency", "Latitude", "Longitude", "Opened_dt", "Phone", "Status" },
                values: new object[,]
                {
                    { 1, "19020 111th Ave", "AB100", "Monday - Friday 7:30am - 5:00pm", 1, "CAD", 54.0, -114.0, new DateOnly(2008, 9, 15), "780-801-5006", "Open" },
                    { 2, "26229 Twp 531 A Unit 115", "ABACH", "Monday - Friday 7:30am - 5:00pm", 2, "CAD", 54.0, -114.0, new DateOnly(2008, 6, 26), "(780)-960-4120", "Open" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CityId",
                table: "Branches",
                column: "CityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BU_Codes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Business_Hours = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Opened_dt = table.Column<DateOnly>(type: "date", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "City", "Country", "Currency", "Latitude", "Longitude", "Opened_dt", "Phone", "State", "Status" },
                values: new object[,]
                {
                    { 1, "19020 111th Ave", "AB100", "Monday - Friday 7:30am - 5:00pm", "EDMONTON", "Canada", "CAD", 54.0, -114.0, new DateOnly(2008, 9, 15), "780-801-5006", "Alberta", "Open" },
                    { 2, "26229 Twp 531 A Unit 115", "ABACH", "Monday - Friday 7:30am - 5:00pm", "ACHESON", "Canada", "CAD", 54.0, -114.0, new DateOnly(2008, 6, 26), "(780)-960-4120", "Alberta", "Open" }
                });
        }
    }
}
