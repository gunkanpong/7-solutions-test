import styled from "@mui/system/styled";


export const DivOverflow = styled("div")<{ left?: boolean }>(
    ({ theme, left }) => ({
        marginTop: left ? "0rem" : "1rem",
        height: `calc(100vh - ${left ? 220 : 230}px)`,
        overflowY: "auto",
        backgroundColor: "#F8F8F8",
    })
);

export const Header = styled("div")(({ theme }) => ({
    position: "sticky",
    padding: "0 0.5rem",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 20,
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#14378A',
    "span::selection": {
        background: "transparent",
    },
    [theme.breakpoints.down("sm")]: {
        height: 48,
        fontSize: 18,
    },
}));

export const Body = styled("div")(({ theme }) => ({
    overflowY: "auto",
    paddingBottom: "1rem",
    height: "calc(100% - 56px)",
    [theme.breakpoints.down("sm")]: {
        height: "calc(100% - 48px)",
    },
}));