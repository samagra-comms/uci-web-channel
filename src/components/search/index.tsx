import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { FaSearch } from "react-icons/fa";
import RenderVoiceRecorder from "../recorder/RenderVoiceRecorder";
import { Box } from "@chakra-ui/react";


function SearchBar({ onChange }) {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const showInput = isHovered || isFocused;
    setShowSearchInput(showInput);
  }, [isFocused, isHovered]);

  useEffect(() => {
    if (targetRef.current) targetRef.current.value = "";
  }, [showSearchInput]);

  useEffect(() => {
    onChange({ target: { value } });
  }, [onChange, value]);

  return (
    <>
      {!showSearchInput && (
        <div style={{ animation: `fadeIn 1s linear` }}>
          <Box
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            चैट
          </Box>
        </div>
      )}
      <div
        className={`${styles.container} ${showSearchInput ? styles.hover : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          ref={targetRef}
          className={`${styles.searchInput} ${
            showSearchInput ? styles.show : ""
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="बॉट का नाम"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
        />

        {showSearchInput ? (
          <div className={styles.voiceIcon} style={{ padding: "5px" }}>
            <RenderVoiceRecorder setInputMsg={setValue}/>
          </div>
        ) : (
          <FaSearch
            className={`${styles.iconCommon} ${styles.iconMagnifyingGlass}`}
            style={{ top: "14px", right: "12px" }}
            onClick={() => setIsHovered(true)}
          />
        )}
      </div>
    </>
  );
}

export default SearchBar;
