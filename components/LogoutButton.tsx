"use client";

import { useAuth } from "@/hooks/useAuth";

interface LogoutButtonProps {
  variant?: "button" | "link";
  className?: string;
}

export default function LogoutButton({
  variant = "button",
  className = "",
}: LogoutButtonProps) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (variant === "link") {
    return (
      <button
        onClick={handleLogout}
        style={styles.linkButton}
        className={className}
        type="button"
      >
        Logout
      </button>
    );
  }

  return (
    <div style={styles.container} className={className}>
      {user && (
        <span style={styles.userName}>
          Welcome, <strong>{user.name}</strong>
        </span>
      )}
      <button onClick={handleLogout} style={styles.button} type="button">
        Logout
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    color: "#555",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#dc3545",
    fontSize: "0.875rem",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
  },
};
