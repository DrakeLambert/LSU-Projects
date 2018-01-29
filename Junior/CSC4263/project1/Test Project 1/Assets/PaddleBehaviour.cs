using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PaddleBehaviour : MonoBehaviour
{
    Rigidbody2D pad;


    // Use this for initialization
    void Start()
    {
        pad = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.Space))
        {
            pad.AddTorque(300f);
        }
    }
}
